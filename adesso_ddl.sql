/* DDL手書き */

create database adesso character set 'utf8';

CREATE TABLE m_shops(
shop_id INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT "店舗ID",
shop_name CHAR(30) NOT NULL COMMENT "店舗名",
post_number CHAR(7) NOT NULL COMMENT "郵便番号",
`address` VARCHAR(200) NOT NULL COMMENT "所在地",
building VARCHAR(100) COMMENT "建物名",
latitude DOUBLE NOT NULL COMMENT "緯度",
longitude DOUBLE NOT NULL COMMENT "経度",
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
speed DOUBLE(2,1) NOT NULL COMMENT "速さ",
about VARCHAR(500) COMMENT "内容"
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
null,
31.7308715,
131.1210971,
"takashivue@gmail.com",
"08090509926",
"1.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"The Rich Kibun",
"8891902",
"宮崎県三股町五本松13-2",
null,
31.7308715,
131.1210971,
"takashivue@gmail.com",
"08090509926",
"2.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"ラーメン食堂 ~ assari ~",
"8891902",
"宮崎県三股町五本松13-2",
null,
31.7308715,
131.1210971,
"takashivue@gmail.com",
"08090509926",
"3.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"餃子のニシヤマ",
"4530064",
"愛知県名古屋市中村区草薙町1-101",
"ブランシュビル 1階",
35.1711002,
136.850492,
"takashivue@gmail.com",
"08090509926",
"4.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"スシオー",
"4530064",
"愛知県名古屋市中村区草薙町1-101",
"ブランシュビル 1階",
35.1711002,
136.850492,
"takashivue@gmail.com",
"08090509926",
"5.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"サイゾリア",
"4530064",
"愛知県名古屋市中村区草薙町1-101",
"ブランシュビル 1階",
35.1711002,
136.850492,
"takashivue@gmail.com",
"08090509926",
"6.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"洋食屋さと",
"4530064",
"愛知県名古屋市中村区草薙町1-101",
"ブランシュビル 1階",
35.1711002,
136.850492,
"takashivue@gmail.com",
"08090509926",
"7.jpg",
"2020/11/18 12:10:00"
);
INSERT INTO m_shops VALUES(
null,
"マクドナダル",
"4530064",
"愛知県名古屋市中村区草薙町1-101",
"ブランシュビル 1階",
35.1711002,
136.850492,
"takashivue@gmail.com",
"08090509926",
"8.jpg",
"2020/11/18 12:10:00"
);

INSERT INTO t_tags VALUES(
1,
"食堂"
);

INSERT INTO t_tags VALUES(
1,
"大盛無料"
);

INSERT INTO t_tags VALUES(
2,
"食堂"
);


/* reviews */
INSERT INTO t_reviews VALUES(
null,
4,
1,
"2019/12/07",
"4.5",
"5.0",
"5.0",
"4.0",
"4.0",
"価格も安く味もおいしかった。"
);

INSERT INTO t_reviews VALUES(
null,
4,
1,
"2019/12/07",
"5.0",
"5.0",
"4.0",
"4.0",
"4.0",
"価格も安く味もおいしかった。"
);

INSERT INTO t_reviews VALUES(
null,
5,
2,
"2019/12/07",
"3.5",
"5.0",
"4.0",
"4.0",
"4.0",
"また来ようと思う。"
);

INSERT INTO t_reviews VALUES(
null,
5,
2,
"2019/12/07",
"4.0",
"5.0",
"4.0",
"4.0",
"4.0",
"また来たい。"
);