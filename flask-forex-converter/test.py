from unittest import TestCase
from app import app

class ConverterTests(TestCase):
    def test_home_page(self):
        """Test if route redirects to homepage and creates correct HTML"""
        with app.test_client() as client:
            resp = client.get("/")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            #check if rendered html has correct headers and forms
            self.assertIn('<h1>Python Forex Converter</h1>', html)
            self.assertIn('<label for="convert-from">Converting from: </label>', html)
            self.assertIn('<input class = "form-control form-content" type="text" name="convert_from" id="convert-from">', html)
            self.assertIn('<label for="convert-to">Converting to: </label>', html)
            self.assertIn('<input class = "form-control form-content" type="text" name="convert_to" id="convert-to">', html)
            self.assertIn('<label for="amount">Amount: </label>', html)
            self.assertIn('<input class = "form-control form-content" type="number" name="amount" id="amount">', html)
    
    def test_convert_route_missing_values (self):
        """Test if form was submitted and 1 or more values are blank"""
        with app.test_client() as client:
            resp = client.get("/convert?convert_from=&convert_to=&amount=")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<div class="error">missing convert to value</div>', html)
            self.assertIn('<div class="error">missing convert from value</div>', html)
            self.assertIn('<div class="error">missing amount value</div>', html)
    
    def test_convert_route_incorrect_convert_code(self):
        """Test if form was submitted and 1 or more convert code is incorrect"""
        with app.test_client() as client:
            resp = client.get("/convert?convert_from=USD&convert_to=dasdasdsa&amount=1")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<div class="error">dasdasdsa not a valid currency</div>', html)

    def test_convert_route_negative_amount(self):
        """Test if form was submiited and amount is negative"""
        with app.test_client() as client:
            resp = client.get("/convert?convert_from=USD&convert_to=dasdasdsa&amount=-100")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<div class="error">amount must be greater than 0</div>', html)

    def test_convert_all_correct_values(self):
        """Test if form was submitted and all form values are valid"""
        with app.test_client() as client:
            resp = client.get("/convert?convert_from=USD&convert_to=USD&amount=1")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<div>Converted Value 1 USD - USD: $ 1.00</div>', html)