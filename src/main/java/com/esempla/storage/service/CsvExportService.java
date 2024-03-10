import com.esempla.storage.domain.User;
import com.esempla.storage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/csv")
public class CsvExportService {
    private final UserRepository userRepository;

    @Autowired
    public CsvExportService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/userList")
    public StreamingResponseBody downloadCsv() {

        return outputStream -> {
            List<User> users = userRepository.findAll();
            try (Writer writer = new OutputStreamWriter(outputStream, StandardCharsets.UTF_8)) {
                // Write the CSV content here if needed, otherwise you can leave this block empty
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
    }
}
