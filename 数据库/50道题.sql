#SQL练习题要素分析
#1、有几个表
#2、关联条件是什么
#3、是否要分组
#4、查询条件是什么
#5、是否需要子查询

#1、查询"01"课程比"02"课程成绩高的学生的信息及课程分数
#student a、sc b、sc c
#a.s=b.s
#查询01课程的成绩
select * from sc where c = 01;
#查询02课程的成绩
select * from sc where c = 02;
#
select c.*, a.score01, b.score02 from (select s, score score01 from sc where c = 01) a
join (select s, score score02 from sc where c = 02) b on a.s = b.s and a.score01 > b.score02
join student c on a.s = c.s;

select * from student a join sc b on a.s = b.s
join sc c on a.s = c.s and b.score > c.score
where b.c = 01 and c.c = 02;


#2、查询"01"课程比"02"课程成绩低的学生的信息及课程分数



#3、查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩
select a.s, a.Sname, avg(b.score) from student a join sc b on a.s = b.s
group by a.s, a.Sname having avg(b.score) >= 60;

#4、查询平均成绩小于60分的同学的学生编号和学生姓名和平均成绩


#5、查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩
select a.s, a.Sname, count(1) 选课总数, sum(score) 总成绩 
from student a join sc b on a.s = b.s
group by a.s, a.Sname


#6、查询"李"姓老师的数量 


#7、查询学过"张三"老师授课的同学的信息 
#查询张三的教的课程
select c from teacher a join course b on a.t = b.t
where a.tname = '张三';

select DISTINCT a.* from student a join sc b on a.s = b.s
where b.c in (select c from teacher a join course b on a.t = b.t
where a.tname = '张三');

select DISTINCT a.* from student a join sc b on a.s = b.s
where EXISTS (select c from teacher a1 join course b1 on a1.t = b1.t
where a1.tname = '张三' and b1.c = b.c);

select DISTINCT a.* from student a join sc b on a.s = b.s
join (select c from teacher a join course b on a.t = b.t
where a.tname = '张三') c on b.c = c.c;

#8、查询没学过"张三"老师授课的同学的信息 
select * from student where s not in (
	select DISTINCT b.s from sc b
	where b.c in (
			select c from teacher a join course b on a.t = b.t
			where a.tname = '张三'
	)
);


#9、查询学过编号为"01"并且也学过编号为"02"的课程的同学的信息
select * from sc where c = 01
select * from sc where c = 02

select * from student a 
join (select s,c from sc where c = 01) b on a.s = b.s
join (select s,c from sc where c = 02) c on b.s = c.s



#10、查询学过编号为"01"但是没有学过编号为"02"的课程的同学的信息
select * from sc where c = 01
#没有学过编号02，把学过排除
select * from sc where s not in (select s from sc where c = 02)
#
select DISTINCT a.* from student a 
join (select s,c from sc where c = 01) b on a.s = b.s
join (select s,c from sc where s not in (select s from sc where c = 02)) c on b.s = c.s

#11、查询没有学全所有课程的同学的信息
#查询所有课程
select count(1) from course; 
#分组统计所有学生的课程总数
select s, count(1) from sc group by s
#
select s, count(1) from sc group by s 
having count(1) < (select count(1) from course)


#12、查询至少有一门课与学号为"01"的同学所学相同的同学的信息
#查询01学了哪些课程，然in。再关联学生表


#13、查询和"03"号的同学学习的课程完全相同的其他同学的信息
set @_s = 05;
#查询03学了哪些课程
select c from sc where s = @_s;
#过滤数据，只剩下03同学相关的课程，即01,02,04
select * from sc where c in (select c from sc where s = @_s)
#统计课程数量且与03一样，
select s, count(1) from sc where c in (select c from sc where s = @_s)
group by s HAVING count(1) = (select count(1) from sc where s = @_s)
#且要排除比03学生学的更多的人
select s from sc group by s 
having count(1) > (select count(1) from sc where s = @_s)
#
select s, count(1) from sc where c in (select c from sc where s = @_s)
and s not in 
(
	select s from sc group by s 
	having count(1) > (select count(1) from sc where s = @_s)
)
and s != @_s
group by s HAVING count(1) = (select count(1) from sc where s = @_s)

#使用用户变量保存结果
set @_s = 01;
select @_count := count(1) from sc where s = @_s;

select s from sc where c in (select c from sc where s = @_s)
and s != @_s
and s not in 
(
	select s from sc group by s having count(1) > @_count
)
group by s HAVING count(1) = @_count


#14、查询没学过"张三"老师讲授的任一门课程的学生姓名 


#15、查询两门及其以上不及格课程的同学的学号，姓名及其平均成绩 


#16、检索"01"课程分数小于60，按分数降序排列的学生信息


#17、按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩


#18、查询各科成绩最高分、最低分和平均分：以如下形式显示：课程ID，课程name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率


#19、按各科成绩进行排序，并显示排名
#查询各科成绩并进行排序
set @_c = ''; #保存当前的课程编号
set @_mc = 0; # 保存当前的名次
set @_score = 0; #保存当前成绩
#不考虑同名次的
select if(@_c=c, @_mc := @_mc + 1, @_mc := 1) 名次, @_c:=c 科目, score 成绩
from sc ORDER BY c, score desc;
#考虑同名次的
select if(@_c=c, if(@_score=score, @_mc, @_mc := @_mc + 1), @_mc := 1) 名次, @_c:=c 科目, @_score:=score 成绩
from sc ORDER BY c, score desc;



#20、查询学生的总成绩并进行排名



#21、查询不同老师所教不同课程平均分从高到低显示 

	
#22、查询所有课程的成绩第2名到第3名的学生信息及该课程成绩


#23、统计各科成绩各分数段人数：课程编号,课程名称,[100-85],[85-70],[70-60],[0-60]及所占百分比 


#24、查询学生平均成绩及其名次 


#25、查询各科成绩前三名的记录


#26、查询每门课程被选修的学生数 


#27、查询出只有两门课程的全部学生的学号和姓名 

#28、查询男生、女生人数 

#29、查询名字中含有"风"字的学生信息

#30、查询同名同性学生名单，并统计同名人数 


#31、查询1990年出生的学生名单(注：Student表中Sage列的类型是date) 

#32、查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列 


#33、查询平均成绩大于等于85的所有学生的学号、姓名和平均成绩 


#34、查询课程名称为"数学"，且分数低于60的学生姓名和分数 

#35、查询所有学生的课程及分数情况； 

#36、查询任何一门课程成绩在70分以上的姓名、课程名称和分数； 

#37、查询不及格的课程

#38、查询课程编号为01且课程成绩在80分以上的学生的学号和姓名； 

#39、求每门课程的学生人数 

#40、查询选修"张三"老师所授课程的学生中，成绩最高的学生信息及其成绩


#41、查询不同课程成绩相同的学生的学生编号、课程编号、学生成绩 

#42、查询每门功课成绩最好的前两名 

#43、统计每门课程的学生选修人数（超过5人的课程才统计）。要求输出课程号和选修人数，查询结果按人数降序排列，若人数相同，按课程号升序排列  

#44、检索至少选修两门课程的学生学号 

#45、查询选修了全部课程的学生信息 

#46、查询各学生的年龄

#47、查询本周过生日的学生

#48、查询下周过生日的学生

#49、查询本月过生日的学生

#50、查询下月过生日的学生