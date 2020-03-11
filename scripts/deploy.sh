# install_server.sh로 깔았던 노드, yarn등의 경로를 읽기 위해 환경변수 설정해주는 것
export PATH=$PATH
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

DEPLOY_LOCATION=/home/ubuntu/deploy
PROJECT=/home/ubuntu/deploy/mask-nearby-client
GIT_REPOSITORY=git@github.com:antlikelion/mask-nearby-client.git
# github에 git이라는 계정으로 접속해서 antlikelion이 가진 mask-nearby-client라는 레포에 연결
DIST=/home/ubuntu/deploy/mask-nearby-client/dist 
BUILD=/home/ubuntu/deploy/mask-nearby-client/build
# build명령어는 시간을 꽤 잡아먹기 때문에 DIST 디렉토리 없이 build를 쓰면 무중단 배포에서 한참 멀어진다.
# build로 만들어진 디렉토리를 dist디렉토리로 이름 변경해서 nginx가 dist를 root로 삼게한다.
# 새로 배포를 하면 dist는 dist.old로, build는 새로운 dist로 변경된다.
# 이러한 이름변경은 타임로스가 거의 없기 때문에 훨씬 무중단 배포에 가까워지게 되는 것이다

if [ -d "$PROJECT" ]; then
  echo "Project Exists. Pull New version..."
  cd $PROJECT
  echo "Pull new version..."
  git pull origin master
else
  echo "There's no Project. Clone New version..."
  git clone $GIT_REPOSITORY $PROJECT
fi

exit 0