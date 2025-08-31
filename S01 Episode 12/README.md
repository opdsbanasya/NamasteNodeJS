# Database - SQL & NoSQL
- A database is an orgnized collection of data and on that we can perform operations like storing, retrieving, updating and deleting data.
- Database Management Sysytem (DBMS) is a software that interacts with end users, applications and the database itself to capture and analyze data.
- `Application` → `DBMS` → `Database`
- Often the term `database` is also used loosely to refer to any of the **DBMS**, the **database system** or an **application associated with the database**.

## Why do we need a database?
A database is typically designed so that it is easy to store and access information. The various reasons a database is important are −
- Manages large amounts of data
- Easy to update data
- Accurate data
- Secure data
- Data integrity

---

## Types of Databases
- **Relational DB**: `MySQL`, `PostgreSQL`
- **NoSQL DB**: `MongoDB`
- **In-memory DB**: `Redis`
- **Distributed DB**: `Cassandra`, `CockroachDB`
- **Time-series DB**: `InfluxDB`
- **Object-oriented DB**: `db4o`
- **Graph DB**: `Neo4j`
- **Heirarchical DB**: `IBM IMS`
- **Network DB**: `Integrated Data Store (IDS)`
- **Cloud DB**: `Amazon RDS`, `Google Cloud SQL`

But there are Relational and NoSQL databases which are most commonly used.

---

### Q. What is the use of different types of databases?
Each type of database is designed to handle a different kind of data or a different workload. For example, relational databases are good for **transactional data**, while NoSQL databases are good for **analytical data**. In-memory databases are good for **high-performance applications**, while distributed databases are good for **large-scale applications**.

---

## Relational Database Management System (RDBMS) - MySQL & PostgreSQL
- In `1970s` and `1980s`, the first generation of database management systems were developed. These systems were based on the concept of a relational database, which is a collection of tables that are related to each other.
- `EF Codd` is a computer scientist who introduced `12 rules` for a database to be considered relational, he numbered them from `0` to `12`.
- If a DB follows all the 12 rules, it is considered to be a `pure relational database`.
- A RDBMS is type of DBMS that stores data in a structured format, using `rows` and `columns`.
- `MySQL` and `PostgreSQL` are two of the most popular RDBMSs.

---

### MySQL
- **History**
    - In `1995`, `MySQL` name is a combination of `My`, the name of co-founder `Michael Widenius`'s daughter, and `SQL`, the abbreviation for Structured Query Language.
    - Michael Widenius has 3 childs: `My`, `Max` and `Maria`.
    - Michael Widenius is created `MySQL` as named after his daughter `My`, MaxDB as named after his son `Max` and MariaDB as named after his daughter `Maria`.
    - `MariaDB` is a fork of MySQL, created by the original developers of MySQL beacuse **MySQL was acquired by Sun Microsystems in 2008** and then by **Oracle Corporation in 2010**.
- MySQL is an open-source relational database management system. It is a popular choice for web applications and is used by many high-profile websites, including Facebook, Twitter, and YouTube.
- MySQL is written in C and C++ and is available for Windows, macOS, and Linux.
- MySQL is known for its speed, reliability, and ease of use. It is also highly scalable, meaning it can handle large amounts of data and traffic.
- MySQL has a large and active community of developers who contribute to its development and provide support to users.

---

### PostgreSQL
#### History
- Thare was a scientist named `Micheal Stonebraker` who was working on a project called `Ingres` at the University of California. He was not happy with the way the project was going, So he left the project and started working on a new project called `PostIngres`. This project later became `PostgreSQL`.
- PostgreSQL is an **open-source relational database management system**. It is known for its advanced features, including support for complex data types, full-text search, and geospatial data.
- PostgreSQL is written in C and is available for Windows, macOS, and Linux.
- PostgreSQL is highly extensible, meaning it can be customized to meet the needs of different applications. It is also highly scalable, meaning it can handle large amounts of data and traffic.
- PostgreSQL has a large and active community of developers who contribute to its development and provide support to users.

---

### SQL (Structured Query Language)
- SQL is a query language used to interact with a database. It is used to create, read, update, and delete data in a database.
- SQL is a standard language that is used by most relational database management systems, including MySQL and PostgreSQL.
- SQL is a powerful language that allows you to perform complex queries on a database. It is also easy to learn and use, making it a popular choice for developers and database administrators.

---

## NoSQL Database - MongoDB
- The wave of NoSQL Databases started in the early 2000s.
- Types of NoSQL Databases:
    - **Document Store**: `MongoDB`, `CouchDB`
    - **Key-Value Store**: `Redis`, `DynamoDB`
    - **Column Store**: `Cassandra`, `HBase`
    - **Graph Store**: `Neo4j`, `ArangoDB`
    - **Multi-model Store**: `OrientDB`, `ArangoDB`
- There `NoSQL` mean Not Only SQL, which means that they are not limited to the SQL language and can support other query languages as well.

---

### MongoDB
- MongoDB was created by `10gent` in 2007, which is now known as `MongoDB Inc`.
- It is an **open-source document-oriented database** that is designed for **ease of use and scalability**.
- It is work well with JSON data.
- `MongoDB` name is derived from the word `humongous`, which means extremely large.
- MongoDB can store large amounts of data and is highly scalable, meaning it can handle large amounts of data and traffic.
- **Why MongoDB?**
    - Flexible 
    - Compatible with JS stack
    - Easy to learn
    - Scalable
    - Increase developer productivity
    - Store documents in a JSON-like format

## RDBMS vs NoSQL

<img src="./rdbms%20vs%20nosql.webp" alt="RDBMS vs NoSQL" width="600" />

| **RDBMS** | **NoSQL** |
| --- | --- |
| Table, Rows, Columns | Collection, Document, Fiels |
| Structured Data | Un-structured Data |
| Fixed Schema | Flexible Schema |
| SQL | Mongo(MQL), Neo4j(cypher) |
| Tough to horizontally scale | Easy to scale(horizontal + vertical) |
| Relationship → Foreign Key, Joins | Nested Documents |
| Read-heavy apps, Transaction workloads | Real-time analytics, Distributed Computing |
| MySQL, PostgreSQL | MongoDB, CouchDB |
| Ex. Banking, E-commerce | Ex. Social Media, IoT |

---

[**Previous**](../S01%20Episode%2011/README.md) | [**Next**](../S01%20Episode%2013/README.md)