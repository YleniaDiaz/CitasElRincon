/*
 *  Copyright (C) 2020  Unknown
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import http from '../http-common';

class ImageDataService {
  getAll () {
    return http.get('/image/list');
  }

  get (id) {
    return http.get(`/image/${id}`);
  }

  create (data) {
    return http.post('/image/', data);
  }

  update (data) {
    return http.put('/image/', data);
  }

  delete (id) {
    return http.delete(`/image/${id}`);
  }
}

export default new ImageDataService();
