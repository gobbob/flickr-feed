import PropTypes from 'prop-types';

const photoShape = {
    id: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    secret: PropTypes.string.isRequired,
    server: PropTypes.string.isRequired,
    farm: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    ispublic: PropTypes.number.isRequired,
    isfriend: PropTypes.number.isRequired,
    isfamily: PropTypes.number.isRequired,
    description: PropTypes.exact({
        _content: PropTypes.string.isRequired
    }),
    url_z: PropTypes.string,
    height_z: PropTypes.number,
    width_z: PropTypes.number,
    url_l: PropTypes.string,
    height_l: PropTypes.number,
    width_l: PropTypes.number,
    url_o: PropTypes.string,
    height_o: PropTypes.number,
    width_o: PropTypes.number
};

const photo = PropTypes.exact(photoShape);

const icon = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
]);

export default {
    photoShape,
    photo,
    icon
};
