CREATE TABLE tabulacoes (
    id uuid PRIMARY KEY,
    nomeCliente TEXT,
    protocolo TEXT,
    dataAtendimento TEXT,
    numeroBinado TEXT,
    numeroAcesso TEXT
);

CREATE TABLE gravacoes (
    id uuid PRIMARY KEY,
    telefone TEXT,
    ramal TEXT,
    dataGravacao TEXT
);