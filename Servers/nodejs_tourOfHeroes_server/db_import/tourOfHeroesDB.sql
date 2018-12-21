drop database if exists tourOfHeroes_DB;
create database if not exists tourOfHeroes_DB;
/*drop user if exists 'gallery_root';
create user if not exists 'gallery_root' identified by 'password';*/
/*grant usage on *.* to 'gallery_root'@'localhost' identified by 'password';
grant all privileges on webtech18gallery.* to 'gallery_root'@'localhost';
flush privileges;*/

use tourOfHeroes_DB;
SET FOREIGN_KEY_CHECKS=0;
drop table if exists heroes;
CREATE TABLE `heroes` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET = utf8;

INSERT INTO `heroes` (`id`, `name`) VALUES
('11', 'Mr.Nice'),
('12', 'Narco'),
('13', 'Bombasto'),
('14', 'Celeritas'),
('15', 'Magneta'),
('16', 'RubberMan'),
('17', 'Dynama'),
('18', 'Dr IQ'),
('19', 'Magma'),
('20', 'Tornado');