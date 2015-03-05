#!app/lib/flask/bin/python

from app import app
import os
import sys
port = 1234
if len (sys.argv) > 1:
  port = int (sys.argv[1])
port = int (os.environ.get ('PORT', port))
app.run (port=port, debug=True, host='0.0.0.0')

