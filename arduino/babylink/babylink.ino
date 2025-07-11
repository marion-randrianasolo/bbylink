// BabyLink final avec pull-up

const int sensorLeftPin  = 2;
const int sensorRightPin = 3;
const int buzzerPin      = 5;

int lastLeftState;
int lastRightState;

void setup() {
  Serial.begin(9600);
  pinMode(sensorLeftPin, INPUT_PULLUP);
  pinMode(sensorRightPin, INPUT_PULLUP);
  pinMode(buzzerPin, OUTPUT);

  delay(500); // stabilisation
  lastLeftState  = digitalRead(sensorLeftPin);
  lastRightState = digitalRead(sensorRightPin);
}

void loop() {
  int leftState  = digitalRead(sensorLeftPin);
  int rightState = digitalRead(sensorRightPin);

  // But gauche
  if (leftState == LOW && lastLeftState == HIGH) {
    Serial.println("GAUCHE");
    tone(buzzerPin, 1000, 150);
    delay(500);
  }
  // But droite
  if (rightState == LOW && lastRightState == HIGH) {
    Serial.println("DROITE");
    tone(buzzerPin, 1000, 150);
    delay(500);
  }

  lastLeftState  = leftState;
  lastRightState = rightState;

  delay(50);
}
