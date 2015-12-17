FROM centos:centos7

RUN yum -y install epel-release; yum clean all
RUN yum -y install python-pip; yum clean all
RUN yum -y install python34 mongodb-server

RUN mkdir -p /data/db

ADD . /src

CMD /bin/mongod --dbpath /data/db/ --fork --logpath /var/log/mongod.log && python3.4 /src/server/server.py