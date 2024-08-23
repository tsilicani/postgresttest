CREATE table
    IF NOT EXISTS "public"."pets" (
        "id" serial NOT NULL,
        "name" text NOT NULL,
        "breed" text NOT NULL,
        "age" int4 NOT NULL,
        "owner" text NOT NULL,
        CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
    );

INSERT INTO
    public.pets (name, breed, age, owner)
VALUES
    ('Buddy', 'Golden Retriever', 3, 'John Doe'),
    ('Lucy', 'Labrador', 5, 'Jane Smith'),
    ('Charlie', 'Poodle', 2, 'Alice Johnson'),
    ('Daisy', 'Boxer', 4, 'Mike Brown'),
    ('Max', 'Beagle', 6, 'Sarah Connor');