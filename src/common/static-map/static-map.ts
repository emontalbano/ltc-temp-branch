import {Component} from '@angular/core';

@Component({
  selector: 'jh-static-map',
  templateUrl: 'static-map.html',
  providers: [  ]
})
export class StaticMapComponent {
  public meta: any;
  public apiKey = 'AIzaSyAv0QRF_YvM-KdUG6Q10AxBhlpBCJfaH0U';
  public zoomLevel = 17;
  public gettingLocation = true;
  public accuracyPath = '';
  public coords = {
    latitude: 0,
    longitude: 0
  };

  public setCoord(coords: any) {
    console.log(coords);
    this.coords = coords;
    this.gettingLocation = false;
    this.buildAccuracyPolygon(coords);
  }

  private buildAccuracyPolygon(coords) {
    //Position, decimal degrees
    const lat = coords.latitude;
    const lon = coords.longitude;

    //Earth’s radius, sphere
    const R=6378137;

    //offsets in meters
    const accuracy = coords.accuracy;

    //Coordinate offsets in radians
    const dLat = accuracy/R;
    const dLon = accuracy/(R*Math.cos(Math.PI*lat/180))

    //OffsetPosition, decimal degrees
    const deltas = [dLat * 180/Math.PI, dLon * 180/Math.PI];
    let coordArray = [];
    for (let angle = 0; angle <= 180; angle += 10) {
      coordArray.push( [  lat + (deltas[0] * Math.cos(angle*Math.PI/180)),
      lon + (deltas[1] * Math.sin(angle*Math.PI/180)) ] );
    }

    for (let angle = 180; angle >= 0; angle -= 10) {
      coordArray.push( [ lat + (deltas[0] * Math.cos(-angle*Math.PI/180)),
      lon + (deltas[1] * Math.sin(-angle*Math.PI/180)) ] );
    }
    //coordArray.push(coordArray[0]);

    console.log(coordArray);
    
    this.accuracyPath = this.magicEncode(coordArray);
    
  }
  /**
   * Reverse Engineered Google map encoding system.
   * See: https://developers.google.com/maps/documentation/utilities/polylinealgorithm
   * 
   * @param coordArray Array of coordinate pairs to encode
   *     Ex. [ [12.41252, -14.15212 ], [13.4124, -14.1234] ]
   */
  public magicEncode(coordArray: any) {
    coordArray.map( coords => {
      coords[0] = Math.round(coords[0] * 100000);
      coords[1] = Math.round(coords[1] * 100000);
      return coords;
    })
    let encodeStr = [];
    let delta = [0,0];
    
    const encode = (a) => {
      getChar(0 > a ? ~(a << 1) : a << 1);
    }

    const getChar = (encoded) => {
      for (; 32 <= encoded; )
          encodeStr.push(String.fromCharCode((32 | encoded & 31) + 63)),
          encoded >>= 5;
          encodeStr.push(String.fromCharCode(encoded + 63));
    }

    for (var i=0; i<coordArray.length; i++) {
      encode(coordArray[i][0] - delta[0]);
      encode(coordArray[i][1] - delta[1]);
      delta = coordArray[i];
    }
    return encodeStr.join('');
  }
}

