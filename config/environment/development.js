'use strict';

module.exports = {
    env : 'development',
    dbUrl: process.env.DB_URL || '192.168.1.40',
    db_user: process.env.DB_USER || 'root',
    db_password: process.env.DB_PASSWORD || '',
    db_name: process.env.DB_NAME || 'test',
    port: process.env.APP_PORT || 3000,
    ip: process.env.IP,
    socket_port: process.env.SOCKET_PORT || 3333,
    app_name: process.env.APP_NAME || "document",
    api_host_url: process.env.API_HOST_URL || 'http://localhost:3000',
    frontend_host_url: process.env.FRONTEND_HOST_URL || 'http://localhost:3000',
    api_version: process.env.API_VERSION || '/api/1.0',
};
