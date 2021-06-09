# Coding Assignment

## Using

* PixiJS, HTML elements, CSS
* OOP
* MVC, design pattern

## Test requirements

1. Create a rectangular area.
2. Inside the rectangular area, generate random shapes with random colors.
3. The shapes must fall down from top to bottom; the generate position is outside the top of the rectangle, the
bottom position is outside the bottom of the rectangle. The falling is controlled by the Gravity Value.
4. If you click inside the rectangle, a random shape of random color will be generated at mouse position
and start falling.
5. If you click a shape, it will disappear.
6. The application should also work on mobile

---
 
`Important`: The application should have memory optimization and as many design patterns as
possible added. We will evaluate the design pattern first, then the code.
 
---

Shape types:

* 3 sides
* 4 sides
* 5 sides
* 6 sides
* circle
* ellipse
* random polyhedron with curves

7. In the top left area of the rectangle, you will have two HTML text fields: one showing the number of
shapes being displayed in the rectangle, the other showing the surface area (in px^2) occupied by the
shapes.
8. At the bottom of the rectangular area, you will add a couple of controls (HTML):

* -/+ increase or decrease the number of shapes generated per second (update the text field
accordingly)
* -/+ increase or decrease the gravity value (update the text value accordingly)
