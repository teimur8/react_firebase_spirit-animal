import React, { Component, PropTypes } from "react";
import FileInput from "react-file-input";
import { storage, database } from "./firebase";
import "./ProfileCard.css";

class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.storageRef = storage.ref("/user-iamges").child(props.uid);
    this.userRef = database.ref("/users").child(props.uid);
  }

  handleSubmit = event => {
    const file = event.target.files[0];
    const uploadTask = this.storageRef.child(file.name).put(file, {
      contentType: file.type
    });

    uploadTask.on("state_changed", snapshot => {
      var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      console.log(percent + "% done");
    });

    uploadTask.then(snapshot => {
      this.userRef.child("photoURL").set(snapshot.downloadURL);
    });
  };

  render() {
    return (
      <article className="ProfileCard">
        <img src={this.props.user.photoURL} className="ProfileCard--photo" />
        <h3>{this.props.user.displayName}</h3>
        <FileInput
          accept=".png,.gif,.jpg"
          placeholder="Select an image"
          onChange={this.handleSubmit}
        />
        <button>Upload Spirit Animal</button>
      </article>
    );
  }
}

ProfileCard.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  imageName: PropTypes.string,
  imageURL: PropTypes.string,
  photoURL: PropTypes.string,
  uid: PropTypes.string
};

export default ProfileCard;
