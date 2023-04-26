FROM mcr.microsoft.com/mssql/server AS base


ENV MSSQL_SA_PASSWORD: <YourStrong@Passw0rd>
ENV ACCEPT_EULA: Y
ENV MSSQL_RPC_PORT: 135

COPY . .


HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=10 \
    CMD /opt/mssql-tools/bin/sqlcmd -S . -U sa -P Password123 -i Db/Scripts/SetupDb.sql || exit 1