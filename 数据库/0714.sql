drop database if exists cdw100;
CREATE DATABASE `cdw100` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

show databases;

show tables;

drop table if exists dept;
create table dept(
                     deptno int(4) not null primary key auto_increment,
                     dname varchar(14) default null,
                     loc varchar(14) default null
)engine=InnoDB auto_increment=1 default charset=utf8;

create table emp(
                    empno int(4) not null primary key auto_increment,
                    ename varchar(14) default null
)engine=InnoDB auto_increment=1 default charset=utf8;


insert into dept(deptno) values(1);
insert into dept(dname) values('dd');
insert into dept(deptno, dname) values(0, 'dd');
insert into dept(deptno, dname) values(0, 'dd'),(0, 'dd1'),(0, 'dd2');

insert into dept set dname = 'dd3';
insert into dept(deptno, dname, a) values(0, 'dd', 'dd', 'dd');

update dept set loc = '成都' where dname='dd';
update dept set loc = '成都', bbq='111' where dname='dd1';
update dept set a = '成都启aaaa' where dname='dd1' and loc = '成都';

insert into emp(ename) values('aa');
修改多表
update dept a, emp b set a.loc = '成都aaa', b.ename = '张三111'
where a.dname='dd2' and b.empno = 1;


delete from dept where dname='dd2';

delete a, b from dept a, emp b where a.dname='dd3' and b.empno = 1



insert into student(id, code, name, age, score) values('1', '896', '雷涛', '16', '89');

select * from dept;
select deptno, dname from dept;
select deptno 部门编号, dname as 部门名称 from dept;
select deptno "部门 编号", dname as "create" from dept;

select distinct job from emp;
select distinct job, sal from emp; 是job和sal的值都一样才算重复
select sal, distinct job from emp; 错误
select distinct * from emp; 支持的

select sal + 100 from emp;
select ifnull(sal, 0) + 100 from emp;

# 查询部门编号为10的员工
select * from emp where deptno = 10;
# 查询部门编号为10及工资为2450的员工
select * from emp where deptno = 10 and sal = 2450;
#元组写法，在后一个场景下使用比较方便
select * from emp where (deptno, sal) = (10, 2450);

# deptno > 10 or (deptno = 10 and sal > 2450)
select * from emp where (deptno, sal) > (10, 2450);

# 查询工资1000到2000的员工
select * from emp where sal >= 1000 and sal <= 2000;
select * from emp where sal BETWEEN 1000 and 2000;

#查询在部门编号为10和20的员工信息
select * from emp where deptno = 10 or deptno = 20;
select * from emp where deptno in (10,20);


#查询没有奖金的员工
select * from emp where comm is null;
#查询有奖金的员工
select * from emp where comm >= 0; # null不是0无法与0比较
select * from emp where comm is not null;

#查询员工姓名以a开头的
select * from emp where ename like 'a%';
#查询第二个字母是a的员工
select * from emp where ename like '_a%';
#查询员工姓名有a字母的员工
select * from emp where ename like '%a%';

select 10 mod 3;

#查询所有员工的信息，以工资升序排序
select * from emp ORDER BY sal asc;
select * from emp ORDER BY sal desc;

#别名排序
select empno, sal 工资 from emp  ORDER BY 工资 asc;
select empno, sal 工资 from emp  ORDER BY sal asc;

#多个排序
#查询所有员工的信息，以工资升序排序，然后再以奖励降序排序
#如果工资相同再来奖励排序
select empno, sal 工资, comm from emp  ORDER BY 工资 asc, comm desc;

#以工资和奖金之后进行降序排序
select empno, sal 工资, comm from emp  ORDER BY (工资 + IFNULL(comm,0)) desc;

select * from emp order by sal desc
#查询工资排名前五的员工
select * from emp order by sal desc limit 0, 5;
#查询工资排名6~10名的员工
select * from emp order by sal desc limit 5, 5;

#按部门分组查询
select * from emp group by DEPTNO; #没意义，应该让它报错，在Oracle就会报错
select DEPTNO from emp group by DEPTNO; #分组去重能力

set @@sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';


#统计一下所有员工数量
select count(*) from emp; #统计整个表

select count(ename) from emp; #写列名，不会统计null值
select count(comm) from emp; #写列名，不会统计null值

select count(1) from emp; #统计整个表

#统计销售人员的数量
select count(1) from emp where job='salesman';
#统计不同部门之间人数
select DEPTNO, count(1) from emp group by DEPTNO;

#统计整个公司的开销
select sum(sal + IFNULL(comm,0)) from emp;
#统计每个部门的开销
select DEPTNO, sum(sal + IFNULL(comm,0)) from emp GROUP BY DEPTNO;

#统计每个部门的平均
select DEPTNO, avg(IFNULL(sal,0)) from emp GROUP BY DEPTNO;
#整个公司的平均奖金
select avg(comm) from emp;
select avg(IFNULL(comm,0)) from emp;

#练习：统计各部门的最高工资、最低工资
select DEPTNO, max(sal), min(sal) from emp group by DEPTNO;

#练习：查询销售部所有员工的名字在一列中，并使用逗号分隔。
select GROUP_CONCAT(ename SEPARATOR ', ') from emp where deptno=30;

select GROUP_CONCAT(ename SEPARATOR ', ') from emp group by deptno;

#示例：查询部门平均工资高于2000且小于2300部门编号
select deptno from emp group by deptno having avg(sal) > 2000 and avg(sal) <2300;



