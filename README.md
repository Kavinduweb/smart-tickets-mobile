# smart-tickets-mobile
CREATE TYPE student_t AS OBJECT(
sNo VARCHAR2(5),
sName VARCHAR2(20),
)
/

CREATE TABLE students OF student_t
/

SELECT * FROM TAB;
/
INSERT INTO students VALUES (student_t('s123','Kamindu'))
/
SELECT type_name FROM user_types
/
DROP TABLE emo
/
DROP TYPE emp_t
/

--- Ref ---
CREATE TYPE student_t AS OBJECT(
sNo VARCHAR2(5),
dep REF dep_t
)
/
INSERT INTO sells VALUES(
	123,
	(SELECT REF(e) FROM beers e WHERE name='Swan');
/

--- V Array ---
CREATE TYPE price_array AS VARRAY(10)
OF NUMBER(12,2)
/
CREATE TABLE price_list(
pNo inegert,
prices price_array)
/
SELECT pNo, s. column_value price 
FROM price_list p,TABLE(p.price) s
/


--- Nested Table ---
CREATE TYPE proj_t AS OBJECT (
pno number,
pname VARCHAR2(20)
)
/
CREATE TYPE proj_list AS TABLE OF proj_t 
/
CREATE TYPE emp_t AS OBJECT (
eno NUMBER,
ename VARCHAR2(20),
projects proj_list
)
/
CREATE TABLE employee OF emp_t (eno PRIMARY KEY)
NESTED TABLE projects
STORE AS employees_proj_table
/
INSERT INTO employees VALUES(1000, proj_list(
    proj_t(101, 'Avionics'), 
    proj_t(102, 'Cruise control')
));
/
SELECT e.eno, p.*
FROM empoyees e, TABLE(e.projects) p
/
INSERT INTO TABLE(SELECT e.projects FROM employees e WHERE e.eno=1000)
VALUES(103,'Project Neptune')
/
UPDATE TABLE(SELECT e.projects FROM employees e WHERE e.eno=1000) p
SET p.pname= 'Project Pluto'
WHERE p.pno=103
/
DELETE TABLE(SELECT e.projects FROM employees e WHERE e.eno=1000) p
WHERE p.pno=103
/
UPDATE employees e
	SET e.projects = NULL 
	WHERE e.eno = 1000; 
/


--- Member Function ---
CREATE TYPE menu_t AS OBJECT(
barNo NUMBER,
beer REF beer_t,
MEMBER FUNCTION priceInYen(rate in FLOAT)
       RETURN FLOAT
)
/
CREATE TYPE BODY menu_t AS
MEMBER FUNCTION
priceInYen(rate in FLOAT)
RETURN FLOAT IS
  BEGIN
     RETURN rate*self.price;
  END;
END;
/
CREATE TABLE sells AS menu_t
/
ALTER TYPE menu_t
ADD MEMBER FUNCTION 
priceInUSD(rate in FLOAT)
RETURN FLOAT
CASCADE
/
CREATE OR REPLACE TYPE BODY menu_t AS
MEMBER FUNCTION
priceInYen(rate in FLOAT)
RETURN FLOAT IS
  BEGIN
     RETURN rate*self.price;
  END;
MEMBER FUNCTION 
priceInUsd(rate in FLOAT)
RETURN FLOAT IS
  BEGIN
     RETURN rate*self.price;
  END;
END;
/

--- Map Member Function ---
CREATE TYPE Rectangle_type AS OBJECT 
( length NUMBER, 
   width NUMBER, 
  MAP MEMBER FUNCTION area RETURN NUMBER
); 
/
CREATE TYPE BODY Rectangle_type AS
MAP MEMBER FUNCTION area RETURN NUMBER IS 
   BEGIN 
      RETURN length * width; 
   END area; 
END;
/
SELECT DISTINCT VALUE(r) FROM rectangles r;


--- Order Member Function ---
CREATE TYPE Customer_typ AS OBJECT 
	( id NUMBER, 
	  name VARCHAR2(20), 
	  addr VARCHAR2(30), 
	  ORDER MEMBER FUNCTION match (c Customer_typ) RETURN INTEGER ); 
/
CREATE TYPE BODY Customer_typ AS 
ORDER MEMBER FUNCTION match (c Customer_typ) RETURN INTEGER IS
	BEGIN 
	     IF id < c.id THEN RETURN -1; -- any num <0 
	     ELSIF id > c.id THEN RETURN 1; -- any num >0 	
              ELSE RETURN 0; 
	     END IF; 
	END; 
END; 
/

--- Inheritance ---
ALTER TYPE Person_type NOT FINAL;
/
CREATE TYPE Student_type UNDER Person_type 
	  ( deptid NUMBER,
       major VARCHAR2(30)) NOT FINAL;
/
CREATE TYPE PartTimeStudent_type UNDER Student_type
	(numhours NUMBER);
/
Create table person_tab of person_type
(pid primary key);
/
Insert into person_tab values
	( student_type(4, 'Edward Learn', 
          '65 Marina Blvd, Ocean Surf, WA, 6725',
          40, 'CS')
   );
/
SELECT VALUE(p) FROM person_tab p; 
/
SELECT VALUE(s) 
    FROM person_tab s 
    WHERE VALUE(s) IS OF (Student_type);
/
SELECT VALUE(s) 
FROM person_tab s 
WHERE VALUE(s) IS OF (ONLY student_type); 
/
SELECT Name, TREAT(VALUE(p) AS PartTimeStudent_type).numhours hours
	FROM person_tab p 
	WHERE VALUE(p) IS OF (ONLY PartTimeStudent_type); 
/

--- Not insert ---
CREATE TYPE Address_typ AS OBJECT(...) NOT INSTANTIABLE NOT FINAL;* 
/
CREATE TYPE AusAddress_typ UNDER Address_typ(...); 

--- OverLoading ---
CREATE TYPE MyType AS OBJECT 
	 ( ..., 
	   MEMBER FUNCTION fun(x NUMBER)…, 
	   ...) NOT FINAL;
/

Consider two relations R and S with the following information about them:
Relation R consists of 2,000 pages with 10 tuples per page, and relation S consists of 500 pages
with 50 tuples per page. If S has a B+ tree index on the join attribute, what is the I/O cost of
performing an index nested loops join? Explain your answer

R (join) S
In index nested loop join, inner table should have an index. So the S table has to be the
inner table.
So the I/O cost = no pages in R + (B+ tree’s top to bottom travel cost) * no of tuples in R
= 2000 + 2 * (2000 * 10) I/O
Here we assume the height of the B+ tree is 2.


Consider the join of two relations R and S on attributes R.a and S.b. R contains 10,000 tuples and
has 10 tuples per page. S contains 2,000 tuples also with 10 tuples per page. There are 52 buffer
pages available. Estimate the minimum number of page I/Os for performing a Block Nested
Loop join of R and S. Ignore the I/O cost of writing out the result. Explain your steps clearly

Minimum I/O comes when we choose the table which has the minimum no of pages as the
outer table.
So S table is the outer table.
I/O cost = no of pages in S + no of blocks in S * no of pages in R table
= 2000/10 + ((2000/10) / (52-2)) * 2000/10 I/0
