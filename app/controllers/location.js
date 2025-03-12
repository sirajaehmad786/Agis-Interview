const { QueryTypes } = require('sequelize')
const sequelize = require('../../sequelize/config/sequelize')
const message = require("../../sequelize/config/message.json");

exports.getCountries = async(req,res)=>{
    console.log('getCountries');
    
    try {
        const countriesQuery = await sequelize.query(
            "SELECT * FROM countries ORDER BY id desc",
            { type: QueryTypes.SELECT}
        )
        return res.status(200).send({
            status: true,
            message: message.LOCATION.COUNTRY_LIST,
            message: countriesQuery
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: message.ERRORS.GENERAL,
            error: error
        })
    }
}

exports.getState = async(req,res)=>{
    try {
        const stateQuery = await sequelize.query(
            'SELECT * FROM states WHERE country_id = " ' + req.body.countryId + '"',
            { type: QueryTypes.SELECT}
        )
        return res.status(200).send({
            status: true,
            message: message.LOCATION.STATE_LIST,
            message: stateQuery
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: message.ERRORS.GENERAL,
            error: error
        })
    }
}

exports.getCities = async(req,res)=>{
    try {
        const citiesQuery = await sequelize.query(
            'SELECT * FROM cities WHERE state_id = "' + req.body.stateId + '"',
            { type: QueryTypes.SELECT}
        )
        return res.status(200).send({
            status: true,
            message: message.LOCATION.CITIES_LIST,
            message: citiesQuery
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: message.ERRORS.GENERAL,
            error: error
        })
    }
}