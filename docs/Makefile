# Nombre del proyecto
DOC := proyecto.tex
PDF := $(DOC:.tex=.pdf)

# Regla por defecto
all: $(PDF)

# Generación del PDF
%.pdf: %.tex FORCE
	pdflatex $<
	-bibtex $*        # el guion delante evita que falle si no hay bibliografía
	pdflatex $<
	pdflatex $<

# Forzar recompilación
FORCE:

# Limpiar archivos auxiliares
clean:
	rm -f *.aux *.bbl *.blg *.toc *.lof *.lot *.log *.out *.pdf
