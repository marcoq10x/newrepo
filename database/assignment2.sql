INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n', 'Client');


UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';


DELETE FROM account
WHERE account_email = 'tony@starkent.com';


UPDATE inventory
SET description = REPLACE(description, 'small interiors', 'a huge interior')
WHERE inv_name = 'GM Hummer';


SELECT i.make, i.model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';



UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
