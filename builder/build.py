# JSBuilder http://code.google.com/p/javascript-builder/

copyright = '(C) @WebReflection - Mit Style License'

import JSBuilder, string, re, os

for dirname, dirnames, filenames in os.walk('src'):
    for subdirname in dirnames:
        subdirname = 'build/' + os.path.join(dirname, subdirname)[4:]
        if not os.path.exists(subdirname):
            os.makedirs(subdirname)
    for filename in filenames:
        filename = os.path.join(dirname, filename)[4:]
        print ("")
        print ("-----------------------")
        print (filename)
        print ("-----------------------")
        JSBuilder.compile(
            copyright,
            'build/' + filename,
            'build/' + JSBuilder.replace(filename, ['.js'], ['.min.js']),
            [
                filename
            ]
        )
        print ("----------------------")
print ("")

# let me read the result ...
import time
time.sleep(2)