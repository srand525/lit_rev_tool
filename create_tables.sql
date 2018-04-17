
#creating database tables with postgres queries

create table datapull_id (
	PullID serial PRIMARY KEY,
	PullDate date,
	PullName varchar(1000),
	PullQuery text,
	PullType varchar(255),
	PullSource varchar(255),
	PullBy varchar(255)
);

create table datapull_detail (	
	PullID integer REFERENCES datapull_id(PullID) ON DELETE RESTRICT,
	PullSource varchar(255),
	AssociatedID varchar(255),
	ValueStore varchar(255),
	Note text,
	OptionalID01 varchar(500),
	OptionalID02 varchar(500)
);


create table datapull_title (
	AssociatedID varchar(255),
	PullSource varchar(255),
	Title varchar(1000),
	JournalName varchar(500),
	JournalISO varchar(255),
	PubType text,
	PublicationDate date,
	PubDay integer,
	PubMonth integer,
	PubYear integer,
	PRIMARY KEY (AssociatedID, PullSource)
);

create table datapull_author (
	AssociatedID varchar(255),
	PullSource varchar(255),
	ForeName text,
	LastName text,
	ContributorType varchar(255),
	ContributorContact varchar(255),
	Affiliation text,
	FOREIGN KEY (AssociatedID,PullSource) REFERENCES datapull_title (AssociatedID,PullSource)
);


create table datapull_keyword (
	AssociatedID varchar(255),
	PullSource varchar(255),
	KeywordValue varchar(255),
	Category1 varchar(255),
	Category2 varchar(255),
	Category3 varchar(255),
	Category4 varchar(255),
	Category5 varchar(255),
	FOREIGN KEY (AssociatedID,PullSource) REFERENCES datapull_title (AssociatedID,PullSource)
);


create table datapull_text (
	AssociatedID varchar(255),
	PullSource varchar(255),
	NLMCategory varchar(255),
	Label varchar(255),
	AbstractText text,
	FOREIGN KEY (AssociatedID,PullSource) REFERENCES datapull_title (AssociatedID,PullSource)
);
