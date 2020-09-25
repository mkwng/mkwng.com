float arcStroke;
int arcCount;
float arcLength;

ArrayList<ArcSection> arcSections = new ArrayList<ArcSection>();

void setup() {
  size(600,600);
  smooth();
  noFill();

  arcCount = 6;
  arcStroke = (width/(arcCount+1));

  for(int i=0;i<arcCount;i++){
    arcSections.add(new ArcSection(i));
  }
  
  strokeWeight(arcStroke/2);
}

void draw() {
  background(175);
  
  for(ArcSection arcSection : arcSections) {
    arcSection.drawSection($(window).scrollTop()*.1);
  }
}
