-- Table: public.hotel

-- DROP TABLE IF EXISTS public.hotel;

CREATE TABLE IF NOT EXISTS public.hotel
(
    id integer NOT NULL,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT hotel_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.hotel
    OWNER to postgres;

-- Table: public.reservation

-- DROP TABLE IF EXISTS public.reservation;

CREATE TABLE IF NOT EXISTS public.reservation
(
    id integer NOT NULL DEFAULT nextval('reservations_id_seq'::regclass),
    user_id integer NOT NULL,
    room_id integer NOT NULL,
    check_in date NOT NULL,
    check_out date NOT NULL,
    CONSTRAINT reservations_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reservation
    OWNER to postgres;

-- Table: public.room

-- DROP TABLE IF EXISTS public.room;

CREATE TABLE IF NOT EXISTS public.room
(
    id integer NOT NULL DEFAULT nextval('room_id_seq'::regclass),
    hotel_id integer NOT NULL,
    "number" integer NOT NULL,
    CONSTRAINT room_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.room
    OWNER to postgres;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    password character varying(256) COLLATE pg_catalog."default" NOT NULL,
    salt character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
