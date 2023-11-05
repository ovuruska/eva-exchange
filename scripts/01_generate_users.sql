DO $$
DECLARE
    max_id INT := 50;
    counter INT := 1;
BEGIN
    WHILE counter <= max_id LOOP
        INSERT INTO users (username)
        VALUES ('user' || counter);
        counter := counter + 1;
    END LOOP;
END $$;
