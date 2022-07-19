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



#0718
#多表查询
#笛卡尔基
#A表有m条记录，B表有n条记录，则会产生m*n条记录的一个结果集
select count(1) from emp; #12
select count(1) from dept; #4
select * from emp a, dept b; #48
select * from emp a, dept b where a.DEPTNO = b.DEPTNO; #12
#关联关系不定是用=号
#查询每个员工的工资等级
select * from emp a, salgrade b where a.sal >= b.LOSAL and a.sal <= b.HISAL;

#查询员工的领导名字
select b.*, a.ENAME 领导名字 from emp a, emp b where a.EMPNO = b.MGR; 

#连接查询

#内连接格式：select * from 表1 [inner] join 表2 on 表1.字段 = 表2.字段 [and 或 or]
#查询有部门的员工的部门信息
select * from emp a join dept b on a.DEPTNO = b.DEPTNO;
#查询所有员工的工资等级
select * from emp a join salgrade b on a.sal >= b.LOSAL and a.sal <= b.HISAL;
SELECT e.*,s.GRADE FROM emp e JOIN salgrade s ON e.SAL>=s.LOSAL AND e.SAL<=s.HISAL;
#查询员工的领导名字
select a.*, b.ename 领导名字 from emp a join emp b on a.MGR = b.EMPNO;

#外连接格式：select * from 表1 left 或 right [OUTER] join 表2 on 表1.字段 = 表2.字段 [and 或 or]
#查询所有员工的部门信息，包括没有部门的员工
select * from emp a LEFT OUTER join dept b on a.DEPTNO = b.DEPTNO;
select * from dept b 
right join emp a on a.DEPTNO = b.DEPTNO;
#查询所有部门及员工信息，保证部门数据完整
select * from emp a right OUTER join dept b on a.DEPTNO = b.DEPTNO;

#查询所有部门人数，以部门名称为做列名
select b.DEPTNO, b.DNAME, count(1) from emp a join dept b on a.DEPTNO = b.DEPTNO
group by b.DEPTNO, b.DNAME;

# 标量子查询
select 
	(select count(1) from emp where DEPTNO = 10) "ACCOUNTING", 
	(select count(1) from emp where DEPTNO = 20) "RESEARCH", 
	(select count(1) from emp where DEPTNO = 30) "SALES"

# 表子查询
#示例：查询各部门工资最高的员工信息
#查询各部门工资最高
select deptno, max(sal) from emp group by deptno;

#也会处理最高工资有多人的情况
select * from emp a 
join (select deptno, max(sal) max_sal from emp group by deptno) b on a.sal = b.max_sal

#查询公司最高工资的员工信息
#最高工资是？
select max(sal) from emp;
#做为条件去找人吧
select * from emp where sal = (select max(sal) from emp);


#示例(having)：部门人数超过2个的部门编号
#统计每个部门的人数
select deptno, count(1) from emp group by deptno
HAVING count(1) > 2;

#查询各部门工资最高，使用列子查询（结果集只有一列多行）
select * from emp where sal in (select max(sal) from emp group by deptno);

#示例：查询与Allen的部门和职位相同的员工信息
select * from emp where (deptno, job) = (select deptno, job from emp where ename = 'Allen');

#查询所有与销售部门工资不一样的人员信息
#查询销售部门的工资
select sal from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES';
select * from emp where sal not in (select sal from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES');
select * from emp where sal <>ALL(select sal from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES');
#查询所有比销售部门所有人的工资高的人员信息
#找出销售部门最高工资
select max(sal) from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES';
select * from emp where sal > (select max(sal) from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES');
select * from emp where sal >ALL(select sal from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES');
#查询所有比销售部门所有人的工资低的人员信息
select * from emp where sal <ALL(select sal from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES');

#和销售部的工资一样的人员信息
select * from emp where sal in (select sal from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES')
select * from emp where sal =ANY(select sal from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES')
#比销售部的最低工资高的人员信息
select * from emp where sal >ANY(select sal from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES')
#比销售部的最高工资低的人员信息
select * from emp where sal <ANY(select sal from emp a join dept b on a.DEPTNO = b.DEPTNO
where b.DNAME = 'SALES')

#示例：查询除老板之外的所有员工信息
#找出老板
select empno from emp where mgr is null;
select * from emp where EMPNO != (select empno from emp where mgr is null)

#示例：查询各部门工资最高的员工信息
select * from emp 
where EXISTS (select 1 from emp GROUP BY DEPTNO HAVING sal = max(sal))


#复制表结构
CREATE table emp_01 like emp;
#复制表数据
insert into emp_01 select empno, ename, job, mgr, hiredate, sal, comm, deptno from emp;
DELETE from emp_01;
insert into emp_01 select * from emp;

#复制表结构及表数据
CREATE table emp_02 as select * from emp;

#将所有员工姓名和部门名称放到一列中
select ename from emp
UNION
select dname from dept;

select sal, ENAME from emp
UNION
select HIREDATE from emp;

select * from emp a join dept b on a.DEPTNO = b.DEPTNO;
#实现全外连接

select * from emp a left join dept b on a.DEPTNO = b.DEPTNO
UNION # 去重
select * from emp a right join dept b on a.DEPTNO = b.DEPTNO;

select empno from emp
UNION
select empno from emp

select empno from emp
UNION all
select empno from emp


#常用函数
select UPPER(ename), LOWER(ename) from emp;

SELECT STR_TO_DATE("August 10 2017", "%M %d %Y");

SELECT DATE_FORMAT('2011-11-11 11:11:11','%Y年%m月%d日 %r')
SELECT DATE_FORMAT(now(),'%Y年%m月%d日 %r')
SELECT DATEdiff(now(),'2022-06-18')
SELECT DATEdiff('2022-06-18',now())

SELECT TIMESTAMPDIFF(YEAR,'1993-03-23 00:00:00',DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%S'))
SELECT TIMESTAMPDIFF(month,'1993-03-23 00:00:00',DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%S'))
SELECT TIMESTAMPDIFF(day,'1993-03-23 00:00:00',DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%S'))

SELECT DATE_ADD('1998-02-02 16:54:00', INTERVAL 31 DAY);
SELECT DATE_ADD('1998-02-02 16:54:00', INTERVAL -31 DAY);

select day(now()), MONTH(now()), year(now()), 
HOUR(now()), MINUTE(now()), SECOND(now()), WEEK(now()), WEEKDAY(now());

#当前最后一天，
select LAST_DAY(now());
#查询入职日期是当月最后一天的人员信息

select LAST_DAY(hiredate), hiredate from emp;

select VERSION();
select DATABASE();
select user();

#根据comm来显示有奖金和无奖金
select comm, if(comm is null, '无奖金', '有奖金') from emp;
select comm, if(comm is null, '无奖金', IF(comm > 0, '有奖金', '无奖金')) from emp;

select case deptno 
				when 10 then 'ACCOUNTING' 
				when 20 then 'RESEARCH' 
				when 30 then 'SALES'
				ELSE '未知部门'
			 end 部门名称
from emp;

select sal, case when sal >= 1000 and sal < 2000 then '低工资'
							when sal >= 2000 and sal < 3000 then '中工资'
							when sal >= 3000 then '高工资'
							ELSE '工资低的可怜'
						end 工资等级
from emp;





