import {
  UpdateAudioQr,
  UpdateDocumentQr,
  UpdateImageQr,
  UpdateMapQr,
  UpdatePlayStoreQr,
  UpdateSocialQr,
  UpdateVideoQr,
  UpdateWebsiteQr,
} from "../Api/QR";

export const UpdateProfileQr = (
  type,
  Id,
  qrName,
  Url,
  lat,
  lon,
  setLoading,
  toast,
  profie,
  close,
  public_id
) => {
  switch (type) {
    case "Website": {
      UpdateWebsiteQr({
        Url: Url,
        UniqueId: Id,
        qrName: qrName,
      }).then((res) => {
        console.log(res);
        if (res.message === "success") {
          close();
          setLoading(false);
          toast("Qr Updated Success");
          profie();
        } else {
          setLoading(false);
          close();
          toast(res);
        }
      });
      break;
    }
    case "PlayStore": {
      UpdatePlayStoreQr({
        Url: Url,
        UniqueId: Id,
        qrName: qrName,
      }).then((res) => {
        console.log(res);
        if (res.message === "success") {
          close();
          setLoading(false);
          toast("Qr Updated Success");
          profie();
        } else {
          setLoading(false);
          close();
          toast(res);
        }
      });
      break;
    }
    case "Audio": {
      UpdateAudioQr({
        Url: Url,
        UniqueId: Id,
        qrName: qrName,
        PublicId: public_id,
      }).then((res) => {
        console.log(res);
        if (res.message === "success") {
          close();
          setLoading(false);
          toast("Qr Updated Success");
          profie();
        } else {
          setLoading(false);
          close();
          toast(res);
        }
      });
      break;
    }
    case "Video": {
      UpdateVideoQr({
        Url: Url,
        UniqueId: Id,
        qrName: qrName,
        PublicId: public_id,
      }).then((res) => {
        console.log(res);
        if (res.message === "success") {
          close();
          setLoading(false);
          toast("Qr Updated Success");
          profie();
        } else {
          setLoading(false);
          close();
          toast(res);
        }
      });
      break;
    }
    case "Images": {
      UpdateImageQr({
        Url: Url,
        UniqueId: Id,
        qrName: qrName,
        PublicId: public_id,
      }).then((res) => {
        console.log(res);
        if (res.message === "success") {
          close();
          setLoading(false);
          toast("Qr Updated Success");
          profie();
        } else {
          setLoading(false);
          close();
          toast(res);
        }
      });
      break;
    }
    case "Documents": {
      UpdateDocumentQr({
        Url: Url,
        UniqueId: Id,
        qrName: qrName,
        PublicId: public_id,
      }).then((res) => {
        console.log(res);
        if (res.message === "success") {
          close();
          setLoading(false);
          toast("Qr Updated Success");
          profie();
        } else {
          setLoading(false);
          close();
          toast(res);
        }
      });
      break;
    }
    case "GoogleMap": {
      UpdateMapQr({
        lat: lat,
        lon: lon,
        UniqueId: Id,
        qrName: qrName,
      }).then((res) => {
        console.log(res);
        if (res.message === "success") {
          close();
          setLoading(false);
          toast("Qr Updated Success");
          profie();
        } else {
          setLoading(false);
          close();
          toast(res);
        }
      });
      break;
    }
    case "Social": {
      UpdateSocialQr({
        Url: Url,
        UniqueId: Id,
        qrName: qrName,
      }).then((res) => {
        console.log(res);
        if (res.message === "success") {
          close();
          setLoading(false);
          toast("Qr Updated Success");
          profie();
        } else {
          setLoading(false);
          close();
          toast(res);
        }
      });
      break;
    }
  }
};
