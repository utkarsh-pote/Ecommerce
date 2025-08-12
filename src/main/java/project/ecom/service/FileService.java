package project.ecom.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {


    public String uploadImage(String path, MultipartFile file, String fileName) throws IOException {
        // Ensure the directory exists
        File f = new File(path);
        if (!f.exists()) {
            f.mkdirs();  // Ensure all directories in the path are created
        }

        // Full path with custom file name
        String filePath = path + File.separator + fileName;

        // File copy
        Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }

    public InputStream getResource(String path, String fileName) throws FileNotFoundException {
        String fullPath = path + File.separator + fileName;
        InputStream is = new FileInputStream(fullPath);
        return is;
    }
}

