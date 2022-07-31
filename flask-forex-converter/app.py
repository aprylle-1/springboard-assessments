from distutils.log import error
from flask import Flask, render_template, request, redirect, session
from forex_python.converter import CurrencyRates, CurrencyCodes
app = Flask(__name__)

currency_rates= CurrencyRates()
currency_codes = CurrencyCodes()
supported_currency = {'USD'}
for currency in currency_rates.get_rates('USD').keys():
    supported_currency.add(currency)
@app.route("/")
def home_page():
    """Direct to Home Page"""
    length_supported_currency = len(supported_currency)
    return render_template('index.html')
@app.route("/convert")
def convert_currency():
    """Route to check if values are valid - converts if all values are valid"""
    errors = []
    convert_to = request.args.get('convert_to')
    convert_from = request.args.get('convert_from')
    amount = request.args.get('amount')

    if not convert_to:
        msg = 'missing convert to value'
        errors.append(msg)
    if not convert_from:
        msg = 'missing convert from value'
        errors.append(msg)
    if not amount:
        msg = 'missing amount value'
        errors.append(msg)
    if convert_to and convert_to not in supported_currency:
        msg = f'{convert_to} not a valid currency'
        errors.append(msg)
    if convert_from and convert_from not in supported_currency:
        msg = f'{convert_from} not a valid currentcy'
        errors.append(msg)
    if amount and float(amount) <= 0:
        msg = 'amount must be greater than 0'
        errors.append(msg)
    if len(errors) == 0:
        converted_value = "{:.2f}".format(round(currency_rates.convert(convert_from, convert_to, float(amount)), 2))
        currency_symbol = currency_codes.get_symbol(convert_to)
        return render_template('index.html', convert_to = convert_to, convert_from = convert_from, amount = amount, converted_value = converted_value, currency_symbol = currency_symbol)
    else:
        return render_template('index.html', errors = errors, convert_to = convert_to, convert_from = convert_from, amount = amount)

