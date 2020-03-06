# Make Deploy Key at Server

```sh
cd ~/.ssh
ssh-keygen -t rsa -b 4096
# passphrase는 그냥 엔터

# After Enroll Deploy Key to Github
ssh -T git@github.com
```
