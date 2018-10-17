# git常用命令总结

## 登录git

- git --version   //查看git的版本信息
- git config --global user.name   //获取当前登录的用户
- git config --global user.email  //获取当前登录用户的邮箱
- git config --global user.name 'userName'    //设置git账户，userName为你的git账号，
- git config --global user.email 'email'

## 创建文件夹

- mkdir node.js 创建node.js文件夹

## 初始化git仓库

- git init  此时文件里会到一个.git的隐藏文件夹

## 创建忽略文件

```
    touch .gitignore    //不需要服务器端提交的内容可以写到忽略文件里
        /*
            .git
            .idea
        */
```

## 查看目录

- ls -al

## 创建文件并写入内容

- 如果文件不存在则会创建文件
```
echo "hello git"
 > index.html       //将'hello git' 写入到index.html中
```
- 单个>箭头表示写入， >>表示追加

## 查看文件内容

- cat index.html

## 添加到暂存区

- git add index.html
- git add -A      //全部添加到缓存区

## 添加到版本库

- git commit -m" "

## 查看版本

- git log --oneline

## 比较差异

- git diff            比较暂存区和工作区的差异
- git diff --cached   比较工作区和历史区的差异
- git diff master     比较历史区和工作区的差异

## 撤回内容

- git checkout index.html   用暂存区中的内容或者版本库中的内容覆盖掉工作区
- git reset HEAD index.html 取消增加到暂存区的内容（添加时）
- git status                显示目录的状体 有没有添加或者修改文件

## 删除文件

- rm fileName       删除本地文件
- git rm index.html --cached    删除暂存区（保证当前工作区中没有index.html）使用--cached 表示只删除缓存区中的内容

## 分支管理

- git branch dev        创建分支
- git checkout dev      切换分支
- git checkout -b dev   创建分支并切换分支
- git branch -d dev     删除分支
- git commit -a -m 'dev1'在分支上提交新的版本
- git merge dev         合并分支
- git log --oneline --graph --decorate  分支的合并后显示log

## 远程仓库

- git push origin master -u   //获取最新代码 第一次将本地仓库推送到GitHub上
- git remote add origin 仓库的地址   //连接远程仓库
- git remote -v     查看远程仓库
- git remote rm origin 删除远程仓库
- git clone 网站上的仓库地址    //先有远程库，后有本地库，从远程库clone到本地库
