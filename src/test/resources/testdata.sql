INSERT INTO USER (ID, USERNAME, PASSWORD, NAME, SURNAME, ROLE_ID)
VALUES (7, 'admin_test', '$2a$10$9P9ftwMSWPoUNQUc91A7Uufix9PiOvbK.ow4tEN9W91a0vBqILsze', 'Дарья', 'Балова', 1),
       (8, 'user_test', '$2a$10$ypt02UMnxbwgMxvHfAHC4uTqV3o9HsejfAqsf52NkFnMRoGvqQCz2', 'Маша', 'Балова', 2),
       (9, 'user_second_test', '$2a$10$EtOO8VUQFVPhBYVYm/QIvO8s0liRDMIVSW1ctfoIrnOZ/nQULWshG', 'Дарья',
        'Балова', 2);
INSERT INTO USER_INFORMATION (ID, ACCOUNT_IMAGE, AGE, GENRE, PHONE_NUMBER,USER_ID)
VALUES (7, NULL, 65,'Женский','-',7L),
       (80, NULL, 45,'Женский','-',8L),
       (15, NULL, 55,'Женский','-',7L);