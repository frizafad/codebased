'use strict';

const data = (data, description = null, code = 200) => {
    return { err: null, data: data, code: code, message: description };
}

const paginationData = (data, meta, description = null, code = 200) => {
    return { err: null, data: data, meta: meta, code: code, message: description };
}

const error = (err, description, code = 500) => {
    return { err: err, data: null, code: code, message: description };
}

const response = (res, type, result, message = null, code = null) => {
    if (message) {
        result.message = message;
    }
    if (code) {
        result.code = code;
    }
    let status = false;
    switch (type) {
        case 'fail':
            status = false;
            break;
        case 'success':
            status = true;
            break;
    }
    res.send(
        {
            success: status,
            data: result.data,
            message: result.message,
            code: result.code
        }
    );
}

const paginationResponse = (res, type, result, message = null, code = null) => {
    if (message) {
        result.message = message;
    }
    if (code) {
        result.code = code;
    }
    let status = `error`;
    switch (type) {
        case 'fail':
            status = 'fail';
            break;
        case 'success':
            status = 'success';
            break;
    }
    res.send(
        {
            status: status,
            data: result.data,
            meta: result.meta,
            code: result.code,
            message: result.message
        }
    );
}

module.exports = {
    data: data,
    paginationData: paginationData,
    error: error,
    response: response,
    paginationResponse: paginationResponse
}