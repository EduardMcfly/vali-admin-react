import axios from 'axios';
function emailVerifySubmit(element) {
  const { props } = element;
  props.toggleOverlay(true);
  axios({
    method: 'post',
    url: './registerVerifyEmail',
    data: { email: props.email.input },
  })
    .then(res => {
      const { data } = res;
      props.toggleOverlay(false);
      if (typeof data.success !== 'undefined') {
        props.history.push('/register/token/');
      } else if (typeof data.errors !== 'undefined') {
        var errors = data.errors;
        element.errorInputs(errors);
      }
    })
    .catch(res => {
      const { data } = res;
      props.toggleOverlay(false);
      if (typeof data.errors !== 'undefined') {
        var errors = data.errors;
        element.errorInputs(errors);
      }
    });
}
export default emailVerifySubmit;
