from flask import Flask, request, render_template, url_for
from app import app
import api

@app.route ('/api/1/sources')
def sources():
    return api.sources ()

@app.route ('/')
def home():
    return render_template ('index.html')

