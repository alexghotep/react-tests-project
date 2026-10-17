<?php
/* rename this file to config.php */
return [
    'host'    => '127.0.0.1',
    'port'    => '3308',
    'db'      => 'db_name',
    'user'    => 'db_user',
    'pass'    => 'db_pass',
    'charset' => 'utf8mb4'
];

/*CREATE TABLE IF NOT EXISTS `settings` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(50) NOT NULL UNIQUE,
  `setting_value` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('counter_value', '0'),
('user_name', 'Гость')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

CREATE TABLE IF NOT EXISTS `tasks` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
  `text` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tasks` (`id`, `text`) VALUES
(1, 'Изучить useState'),
(2, 'Доизучать useState'),
(3, 'Повторить всё про useState'),
(4, 'Закрепить useState')
ON DUPLICATE KEY UPDATE `text` = VALUES(`text`);*/