import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/Popup.css'

const MyPopup = () => (
  <Popup trigger={<button className='popup-plus'><span className='literallyplus'>+</span></button>} position="center center" >
  
    <div className="popup-content">
    <form>
  <div class="form-group">
    <label for="batch">Batch:</label>
  
    <select id="year" name="year" class="form-control">
  <option value="2017">2017</option>
  <option value="2018">2018</option>
  <option value="2019">2019</option>
  <option value="2020">2020</option>
  <option value="2021">2021</option>
  <option value="2022">2022</option>
  
</select>
  </div>
  <div class="form-group">
    <label for="program">Program:</label>
    <input type="text" id="program" name="program" class="form-control" />
  </div>

  <div class="form-group">
    <label for="course-code">Course Code:</label>
    <input type="text" id="course-code" name="course-code" class="form-control" />
  </div>
  <button type="submit" class="btn btn-primary">Create</button>
</form>

    </div>
  </Popup>
);

export default MyPopup;
