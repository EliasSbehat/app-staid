import { useStorageTask } from "reactfire";
import { StorageReference, UploadTask, UploadTaskSnapshot } from "firebase/storage";

export default function useGetUploadProgress(
  uploadTask?: UploadTask,
  storageRef?: StorageReference) {

  if (!uploadTask || !storageRef) {
    return { status: "loading", percentComplete: "0%" };
  }

  const { status, data: uploadProgress } = useStorageTask<UploadTaskSnapshot>(
    uploadTask,
    storageRef
  );

  let percentComplete;

  if (status === "loading") {
    percentComplete = "0%";
  } else {
    const { bytesTransferred, totalBytes } = uploadProgress;
    percentComplete = Math.round(100 * (bytesTransferred / totalBytes)) + "%";
  }

  return { status, percentComplete };
}
