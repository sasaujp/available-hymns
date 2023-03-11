
CREATE TABLE HymnData (
    hymnBookType TEXT CHECK(hymnBookType IN ('1954', 'nihen', '21')) NOT NULL,
    hymnNumber TEXT NOT NULL,
    rightType TEXT CHECK(rightType IN ('publicDomain', 'uccj', 'jasrac', 'other')) NOT NULL,
    numberOfVote INTEGER NOT NULL,
    PRIMARY KEY (`hymnBookType`, `hymnNumber`, `rightType`));


INSERT INTO HymnData (hymnBookType, hymnNumber, rightType, numberOfVote) VALUES ('1954', '1', 'jasrac', 4);

CREATE TABLE HymnVoteRecord (
    id TEXT NOT NULL,
    hymnBookType TEXT CHECK(hymnBookType IN ('1954', 'nihen', '21')) NOT NULL,
    hymnNumber TEXT NOT NULL,
    rightType TEXT CHECK(rightType IN ('publicDomain', 'uccj', 'jasrac', 'other')) NOT NULL,
    votedAt INTEGER NOT NULL,
    PRIMARY KEY (`id`));
