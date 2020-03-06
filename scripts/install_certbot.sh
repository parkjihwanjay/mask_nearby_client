sudo apt-get update
sudo apt-get install software-properties-common -y
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot -y
# 한 번은 엔터 눌러줘야 함


certbot certonly --config-dir=/home/ubuntu/letsencrypt/config --work-dir=/home/ubuntu/letsencrypt/work --logs-dir=/home/ubuntu/letsencrypt/logs --webroot -w /home/ubuntu/deploy/mask-nearby/dist -d mask-nearby.com
# webroot!! build directory!

# 갱신용(인증서 3달마다 갱신)
certbot renew --config-dir=/home/ubuntu/letsencrypt/config --work-dir=/home/ubuntu/letsencrypt/work --logs-dir=/home/ubuntu/letsencrypt/logs