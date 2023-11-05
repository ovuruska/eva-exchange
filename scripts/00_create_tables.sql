CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS shares (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(3) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolios (
  id SERIAL PRIMARY KEY,
  portfolioUser INT NOT NULL REFERENCES users(id),
  portfolioName VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS trades (
  id SERIAL PRIMARY KEY,
  portfolio INT NOT NULL REFERENCES portfolios(id),
  share INT NOT NULL REFERENCES shares(id),
  tradeType INT NOT NULL,
  tradeTime INT NOT NULL,
  tradeDate VARCHAR(10),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio_shares (
  portfolio INT NOT NULL REFERENCES portfolios(id),
  share INT NOT NULL REFERENCES shares(id),
  quantity INT NOT NULL,
  PRIMARY KEY (portfolio, share)
);
