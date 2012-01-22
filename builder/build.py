# JSBuilder http://code.google.com/p/javascript-builder/

copyright = '(C) @WebReflection - Mit Style License'

import JSBuilder, string, re, os

defneProperty = JSBuilder.read(os.path.join('..', 'src', 'defineProperty.js'))

for dirname, dirnames, filenames in os.walk('src'):
    for subdirname in dirnames:
        subdirname = 'build/' + os.path.join(dirname, subdirname)[4:]
        if not os.path.exists(subdirname):
            os.makedirs(subdirname)
    for filename in filenames:
        if (filename in ["yunode.js", "yuno.package.js", "defineProperty.js"]):
            continue
        filename = os.path.join(dirname, filename)[4:]
        print ("")
        print ("-----------------------")
        print (filename)
        print ("-----------------------")
        JSBuilder.compile(
            copyright,
            os.path.join('build', filename),
            os.path.join('build', JSBuilder.replace(filename, ['.js'], ['.min.js'])),
            [
                filename
            ],
            [
                "//:inject defineProperty.js"
            ],
            [
                defneProperty
            ]
        )
        print ("----------------------")
print ("")

# let me read the result ...
import time
time.sleep(2)