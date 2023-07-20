@Service
public class NotificationService {

    private final NotificationsRepository notificationsRepository;

    @Autowired
    public NotificationService(NotificationsRepository notificationsRepository) {
        this.notificationsRepository = notificationsRepository;
    }

    public List<Notifications> getNotificationsForUser(int userId) {
        // Implement logic to fetch notifications based on customerId or riderId.
        // Return the list of notifications for the specified user.
    }
}
