class ArcSection {
  int i;
  color c;
  float l;
  
  ArcSection(int i) {
    this.i = i;
    this.c = color(random(0,100));
    this.l = random(PI/8,PI/4);
  }
  
  void drawSection(float count) {
    float strokeStart = count*pow(.5,i)-PI/2;
    arc(width/2,height/2,arcStroke*(i+1),arcStroke*(i+1),strokeStart,strokeStart+l);
  }
}
