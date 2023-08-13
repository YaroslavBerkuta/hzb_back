import { UnsupportedMediaTypeException } from '@nestjs/common';

export const fileFilter = (...mimetypes: string[]) => {
  return (
    req,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!mimetypes.some((m) => file.mimetype.includes(m))) {
      return callback(
        new UnsupportedMediaTypeException(
          `File type is not invalid, ${file.mimetype} is not allowed `,
        ),
        false,
      );
    }
    callback(null, true);
  };
};
