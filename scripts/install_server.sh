# 0. nginx설치
sudo apt update 
sudo apt install nginx -y

# 1.NVM 설치 : 리눅스에서 노드의 버전을 변경하려면 구버전을 지우고 신버전을 깔아야 한다.
# 그 작업이 생각보다 까다롭기 때문에, 노드의 버전을 동적으로 스위칭해주는 Node Version Manager를 쓰는 것
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
export PATH=$PATH
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# 노드 설치
nvm install 12
# yarn 설치
npm i -g yarn

# 익스프레스 애플리케이션을 배포하기 위한 디렉토리
mkdir -p /home/ubuntu/deploy

# 엔진엑스 config를 담기 위한 디렉토리 
# nginx가 기본적으로 설치되는 경로는 root계정으로 접근해야 하기 때문에 번거롭다.
# 그래서 우리가 ubuntu계정으로 접근할 수 있는 디렉토리에서 nginx 설정파일을 관리하는 게 편하다
mkdir -p /home/ubuntu/config/nginx/sites-available

sudo nginx -c /home/ubuntu/config/nginx/nginx.conf
sudo nginx -c /home/ubuntu/config/nginx/nginx.conf -s stop
sudo nginx -c /home/ubuntu/config/nginx/nginx.conf -s reload

# 엔진엑스 프로세스 확인하는 명령어
# ps aux | grep nginx

# 엔진엑스 로그를 담기 위한 디렉토리 
mkdir -p /home/ubuntu/logs/nginx

# 깃에 scripts가 있음에도 불구하고 서버 컴퓨터 안에 따로 scripts디렉토리를 만들어줘야 한다.
# 왜냐하면 git으로 관리하는 건 엄밀히는 애플리케이션을 관리하는 로직이기 때문.
# scripts에 있는 셸 스크립트들은 애플리케이션이 아닌 배포와 관련된, 구별되어야 하는 로직이다.
mkdir -p /home/ubuntu/scripts

# 즉, 처음 yarn connect:server로 서버 컴퓨터에 접속한 후 이 파일을 그대로 복붙하면 
# 이 파일은 다시 쓸 일이 없다.
# (굳이 서버 컴퓨터의 scripts디렉토리에 담을 필요도 없다는 것)