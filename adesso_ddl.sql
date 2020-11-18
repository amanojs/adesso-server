/* DDL手書き */

create database adesso character set 'utf8';

CREATE TABLE m_shops(
shop_id INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT "店舗ID",
shop_name CHAR(30) NOT NULL COMMENT "店舗名",
post_number CHAR(7) NOT NULL COMMENT "郵便番号",
`address` VARCHAR(200) NOT NULL COMMENT "所在地",
shop_mail VARCHAR(100) COMMENT "メールアドレス",
shop_number CHAR(15) COMMENT "電話番号",
`image` VARCHAR(500) COMMENT "画像",
created_at Datetime NOT NULL COMMENT "登録日"
)CHARACTER SET utf8 COMMENT="店舗テーブル";

CREATE TABLE m_users(
`user_id` VARCHAR(30) PRIMARY KEY NOT NULL COMMENT "会員ID",
email VARCHAR(100) NOT NULL COMMENT "メールアドレス",
`number` CHAR(15) NOT NULL COMMENT "電話番号",
created_at Datetime NOT NULL COMMENT "登録日",
owner_id INT(10) COMMENT "オーナー店舗"
)CHARACTER SET utf8 COMMENT="会員テーブル";

CREATE TABLE t_reviews(
review_id INT(30) PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT "レビューID",
shop_id INT(10) NOT NULL COMMENT "店舗ID",
`user_id` VARCHAR(30) NOT NULL COMMENT "会員ID",
posted_at Datetime NOT NULL COMMENT "投稿日",
taste DOUBLE(2,1) NOT NULL COMMENT "味",
price DOUBLE(2,1) NOT NULL COMMENT "値段",
`service` DOUBLE(2,1) NOT NULL COMMENT "接客",
atmosphere DOUBLE(2,1) NOT NULL COMMENT "雰囲気",
speed DOUBLE(2,1) NOT NULL COMMENT "速さ"
)CHARACTER SET utf8 COMMENT="レビューテーブル";

CREATE TABLE t_tags(
shop_id INT(10) NOT NULL COMMENT "店舗ID",
tag VARCHAR(20) NOT NULL COMMENT "タグ",
PRIMARY KEY (shop_id,tag)
)CHARACTER SET utf8 COMMENT="タグテーブル";


/* seeds */

INSERT INTO m_shops VALUES(
null,
"桒畑食堂",
"8891902",
"宮崎県三股町五本松13-2",
"takashivue@gmail.com",
"08090509926",
"1.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"The Rich Kibun",
"8870011",
"宮崎県日南市捕鯨1-2",
"takashivue@gmail.com",
"08090509926",
"2.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"ラーメン食堂 ~ assari ~",
"8860001",
"宮崎県えびの市捕鯨1-2",
"takashivue@gmail.com",
"08090509926",
"3.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"餃子のニシヤマ",
"4510046",
"愛知県名古屋市中村区",
"takashivue@gmail.com",
"08090509926",
"4.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"スシオー",
"4510046",
"愛知県名古屋市中村区",
"takashivue@gmail.com",
"08090509926",
"5.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"サイゾリア",
"4510046",
"愛知県名古屋市中村区",
"takashivue@gmail.com",
"08090509926",
"6.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"洋食屋さと",
"4510046",
"愛知県名古屋市中村区",
"takashivue@gmail.com",
"08090509926",
"7.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"マクドナダル",
"4510046",
"愛知県名古屋市中村区",
"takashivue@gmail.com",
"08090509926",
"8.jpg",
"2020/11/18 12:10:00"
);
