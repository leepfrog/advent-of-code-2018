import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="puzzle_1b",
    version="0.0.1",
    author="Andy Leeper",
    author_email="leepfrog@mochaleaf.com",
    description="Advent of code - puzzle 1b",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/leepfrog/advent-of-code-2018",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    # scripts=['bin/puzzle_1b']   - commented to avoid installing in bin
)
