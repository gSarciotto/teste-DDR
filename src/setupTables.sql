DROP TABLE IF EXISTS tabulacoes, gravacoes, matchings;

CREATE TABLE tabulacoes (
    id uuid PRIMARY KEY,
    nome_cliente TEXT,
    protocolo TEXT,
    data_atendimento TEXT,
    numero_binado TEXT,
    numero_acesso TEXT
);

CREATE TABLE gravacoes (
    id uuid PRIMARY KEY,
    telefone TEXT,
    ramal TEXT,
    data_gravacao TEXT
);

CREATE TABLE matchings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    gravacao_id uuid REFERENCES gravacoes(id),
    tabulacao_id uuid REFERENCES tabulacoes(id)
);