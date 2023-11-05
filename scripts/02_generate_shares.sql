CREATE OR REPLACE FUNCTION random_string(length INT) RETURNS TEXT AS
$$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    result TEXT := '';
    i INT;
BEGIN
    FOR i IN 1..length LOOP
        result := result || substr(chars, trunc(random() * length(chars) + 1)::INT, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
    max_shares INT := 50;
    counter INT := 1;
BEGIN
    WHILE counter <= max_shares LOOP
        INSERT INTO shares (symbol, price)
        VALUES (random_string(3), trunc(random() * 10000 + 1)::DECIMAL / 100);
        counter := counter + 1;
    END LOOP;
END $$;

DROP FUNCTION random_string(INT);
